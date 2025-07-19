'use client'
import React, {useState, useTransition} from 'react'
import {challengeOptions, challenges, userSubscription} from "../../db/schema";
import Header from "@/app/lesson/Header";
import {useMount} from "react-use";
import QuestionBubble from "@/components/QuestionButbble";
import Challenge from "@/components/Challenge";
import QuizFooter from "@/components/QuizFooter";
import {upsertChallengeProgress} from "../../actions/challenge-progres";
import {toast} from "sonner";
import {reduceHearts} from "../../actions/user-progress";
import {useAudio, useWindowSize} from "react-use";
import Image from "next/image";
import ResultCard from "@/components/ResultCard";
import {useRouter} from "next/navigation";
import ReactConfetti from "react-confetti";
import {useHeartsModal} from "../../store/use-hearts-modal";
import {usePracticeModal} from "../../store/use-practice-modal";
import {points_to_refill} from "../../constant";


type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: typeof  userSubscription.$inferSelect & {isActive: boolean} | null;
}

const Quiz = ({initialPercentage, initialHearts, initialLessonId,initialLessonChallenges, userSubscription }: Props) => {
    const {open: openPracticeModal} = usePracticeModal()

    const {open: openHeartsModal} = useHeartsModal()

    useMount(() => {
        if (initialPercentage === 100) {
            openPracticeModal()
        }
    })

    const {width, height} = useWindowSize()
    const router = useRouter()

    const [finishAudio] = useAudio({src: '/finish.mp3', autoPlay: true})

    const [correctAudio, _c, correctControls] = useAudio({src: '/correct.wav'})
    const [incorrectAudio, _i, incorrectControls] = useAudio({src: '/incorrect.wav'})
    const [lessonId] = useState(initialLessonId)
    const [pending, startTransition] = useTransition()
    const [status, setStatus] = useState<'correct' | 'wrong' |  'completed' | 'none'>('none')

    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage
    })
    const [challenges] = useState(initialLessonChallenges)
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed)

        return uncompletedIndex === -1 ? 0 : uncompletedIndex
    })

    const [selectedOption, setSelectedOption] = useState<number>()

    const challenge = challenges[activeIndex] // navigation of challenges
    const options = challenge?.challengeOptions ?? []


    const onNext = () => {
        setActiveIndex((current) => current + 1)
    }

    const onContinue = () => {
        if (!selectedOption) return

        if (status === 'wrong') {
            setStatus('none');
            setSelectedOption(undefined)
            return;
        }
        if (status === 'correct') {
            onNext()
            setStatus('none');
            setSelectedOption(undefined)
            return;
        }

        const correctOption = options.find((option) => option.correct);

        if (!correctOption) return;

        if (correctOption && correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id).then((response) => {
                    if (response?.error === 'hearts') {
                        openHeartsModal()
                        return
                    }

                    correctControls.play()
                        setStatus('correct')
                    setPercentage((prev) => prev +100 / challenges.length)

                    if (initialPercentage === 100) {
                        setHearts((prev) => Math.min(prev + 1, 5))
                    }
                }).catch(() => toast.error('smth went wrong!'))
            })
        } else {

            startTransition(() => {
                reduceHearts(challenge.id).then((resp) => {
                    if (resp?.error === 'hearts') {
                        openHeartsModal()
                        return
                    }
                    incorrectControls.play()
                    setStatus('wrong')

                    if (!resp?.error) {
                        setHearts((prev) => Math.max(prev - 1 , 0))
                    }
                }).catch(() => toast.error('smth went wrong!'))
            })
        }
    }

    const onSelect = (id: number) => {
        if (status !== 'none') return


        setSelectedOption(id)
    }

    if (!challenge) {
        return  (
            <>

                <ReactConfetti recycle={false} width={width} height={height} numberOfPieces={500} tweenDuration={1000}/>
                <div className='flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center justify-center  h-full items-center'>


                    <Image src='/finish.png' width={50} height={50} alt={'Finish'} className='block lg:hiden'/>
                    <h1 className='text-xl lg:text-3xl font-bold text-neutral-700'>
                        Great job! <br/> you &apos;ve completed the lesson
                    </h1>
                    <div className='flex items-center gap-x-4 w-full'>
                        <ResultCard variant='points' value={challenges.length * 10} />
                        <ResultCard variant='hearts' value={hearts} />
                    </div>
                    <QuizFooter onCheck={() => router.push('/learn')} disabled={pending || selectedOption} status={'completed'} lessonId={lessonId} />
                </div>
            </>
        )
    }

    const title = challenge.type === 'ASSIST' ? 'Select the correct answer' : challenge.question
    console.log(challenge)
    return (
        <div>
            {incorrectAudio}
            {correctAudio}

            <Header hearts={initialHearts}
                    percentage={initialPercentage}
                    hasActiveSubscription={!!userSubscription?.isActive}
            />
            <div className='flex-1'>
                <div className='h-full flex items-center justify-center'>
                    <div className='lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12'>
                        <h1 className='lg:text-3xl text-lg text-center lg:text-start font-bold text-neutral-700'>
                            {title}</h1>
                        <div>
                            {challenge.type === 'ASSIST' && <QuestionBubble question={challenge.question}/>}
                        </div>
                        <Challenge onSelect={onSelect}
                                   status={status}
                                   selectedOption={selectedOption}
                                   disabled={pending}
                                   type={challenge.type}
                                   options={options}/>
                    </div>
                </div>

            </div>

            <QuizFooter disabled={pending || !selectedOption} status={status} onCheck={onContinue}/>
        </div>
    )
}
export default Quiz
