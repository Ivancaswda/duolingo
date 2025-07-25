


import {pgTable, serial, text, integer, pgEnum, boolean, timestamp, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const courses = pgTable('courses', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    imageSrc: text("image_src").notNull(),
})



export const units = pgTable("units", {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text("description").notNull(),
    courseId: integer("course_id").references(() => courses.id, {onDelete: 'cascade'}).notNull(),
    order: integer("order").notNull(),
    color: text('color')
})

export const unitsRelations = relations(units, ({many, one}) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id]
    }),
    lessons: many(lessons) // 👈 This is required too!
}))

export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
    title: text('title').notNull(),
    unitId: integer("unit_id").references(() => units.id, {onDelete: "cascade"}).notNull(),
    order: integer('order').notNull()
})

export const lessonsRelations = relations(lessons, ({ many, one}) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id]
    }),
    challenges: many(challenges)
}))

export const challengesEnum = pgEnum("type", ['SELECT', 'ASSIST',])

export const challenges= pgTable("challenges", {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").references(() => lessons.id, {onDelete: 'cascade'}).notNull(),
    type: challengesEnum('type').notNull(),
    question: text('question').notNull(),
    order: integer('order').notNull(),
})

export const challengesRelations = relations(challenges, ({ many, one}) => ({
    lesson: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id]
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress)
}));

export const challengeOptions = pgTable('challenge_options', {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id").references(() => challenges.id, {onDelete: 'cascade'}).notNull(),
    text: text('text').notNull(),
    correct: boolean('correct').notNull(),
    imageSrc: text('image_src'),
    audioSrc: text('audio_src'),

})
export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeOptions.challengeId],
        references: [challenges.id]
    }),

}));

export const challengeProgress = pgTable('challenge_progress', {
    id: serial("id").primaryKey(),
    userId: text('user_id').notNull(),
    challengeId: integer("challenge_id").references(() => challenges.id, {onDelete: 'cascade'}).notNull(),
    completed: boolean('completed').notNull().default(false)
})
export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeProgress.challengeId],
        references: [challenges.id]
    })
}));

export const userProgress = pgTable('user_progress', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    userName: text('user_name').notNull().default('User'),
    email: text('email').notNull(),
    password: varchar().notNull(),
    userImageSrc: text('user_image_src').notNull().default('/mascot.png'),
    activeCourseId: integer("active_course_id").references(() => courses.id, {onDelete: 'cascade'}),
    hearts: integer('hearts').notNull().default(5),
    points: integer('points').notNull().default(0),
    completedLessons: integer('completed_lessons').notNull().default(0),
    completedUnits: integer('completed_units').notNull().default(0),
})




export const userProgressRelations = relations(userProgress, ({one}) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id]
    })
}))

export const userSubscription = pgTable('user_subscription', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull().unique(),
    stripeCustomerId: text('stripe_customer_id').notNull().unique(),
    stripeSubscriptionId: text('stripe_subscription_id').notNull().unique(),
    stripePriceId: text('stripe_price_id').notNull(),
    stripeCurrentPeriodEnd: timestamp('stripe_current_period_end').notNull()
})
export const coursesRelations = relations(courses, ({many}) => ({
    userProgress: many(userProgress),
    units: many(units)
}))
















