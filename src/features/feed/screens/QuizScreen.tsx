import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from 'react';
import { QUIZ_API_ENDPOINT } from '@env';
import AlternativeBox from "../components/quiz/AlternativeBox";

interface QuizQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers: string[];
}

export default function QuizScreen() {

    const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);


   

    useEffect(() => {
        fetchQuizData();
    }, []);

    const fetchQuizData = async () => {
        try {
        const response = await fetch(QUIZ_API_ENDPOINT);
        const data = await response.json();

        const formattedData = data.results.map((question: QuizQuestion) => {
            const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);
            return {
                ...question,
                answers,
            };
        });
        setQuizData(formattedData);
    
    } catch (error) {
        console.error("Feil ved henting av quiz-data:", error);
    } finally {
        setIsLoading(false);
    }
    };

    const handleAnswer = (answer: string) => {
        if (answered) return;

        setSelectedAnswer(answer);
        setAnswered(true);

        if (answer === quizData[currentQuestionIndex].correct_answer) {
            setScore(score + 1);
        }
    };

    const getButtonColor = (answer: string) => {
        if (!answered) {
            return 'rgba(52, 152, 219, 0.8)';
        }
        if (answer === quizData[currentQuestionIndex].correct_answer) {
            return 'green';
        }
        if (answer === selectedAnswer) {
            return 'red';
        }
        return 'rgba(52, 152, 219, 0.4)';
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setAnswered(false);
            setSelectedAnswer(null);
        } else {
            console.log(`Quiz ferdig! Din poengsum er: ${score}/${quizData.length}`);
        }
    };


    if (isLoading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>Laster spørsmål...</Text>
            </View>
        )
    }

    const currentQuestion = quizData[currentQuestionIndex];
    if (!currentQuestion) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>
                {decodeURIComponent(currentQuestion.question)}
            </Text>
            <View style={styles.answersContainer}>
                {currentQuestion.answers.map((answer, index) => (
                    <AlternativeBox
                        key={index}
                        title={decodeURIComponent(answer)}
                        onPress={() => handleAnswer(answer)}
                        backgroundColor={getButtonColor(answer)}
                    />
                ))}
            </View>
            {answered && (
                <AlternativeBox
                    title="Neste spørsmål"
                    onPress={handleNextQuestion}
                    backgroundColor="#3498db"
                />
            )}
        </View>
    );


}


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#111',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        loadingContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        loadingText: {
            color: '#fff',
            marginTop: 10,
        },
        questionText: {
            fontSize: 22,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
            marginBottom: 30,
        },
        answersContainer: {
            width: '100%',
            alignItems: 'center',
        },
    });