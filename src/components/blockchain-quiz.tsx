
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { PixelIcon } from "./pixel-art";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswers: number[];
  explanation: string;
}

export function BlockchainQuiz() {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which of the following are key features of blockchain technology?",
      options: [
        "Centralization", 
        "Immutability", 
        "Transparency", 
        "Requires a central authority"
      ],
      correctAnswers: [1, 2],
      explanation: "Blockchain is characterized by immutability (once data is recorded, it cannot be altered) and transparency (all transactions are publicly visible). It is decentralized and doesn't require a central authority."
    },
    {
      id: 2,
      question: "Which consensus mechanism is used by Bitcoin?",
      options: [
        "Proof of Stake", 
        "Proof of Work", 
        "Proof of Authority", 
        "Proof of History"
      ],
      correctAnswers: [1],
      explanation: "Bitcoin uses Proof of Work, where miners compete to solve complex mathematical puzzles to validate transactions and create new blocks."
    },
    {
      id: 3,
      question: "What are smart contracts primarily associated with?",
      options: [
        "Bitcoin", 
        "Ethereum", 
        "Traditional banking", 
        "Paper agreements"
      ],
      correctAnswers: [1],
      explanation: "Smart contracts are self-executing contracts with the terms directly written into code. They are primarily associated with Ethereum, which was the first blockchain to implement them effectively."
    },
    {
      id: 4,
      question: "Which of these are Layer 1 blockchains?",
      options: [
        "Bitcoin", 
        "Ethereum", 
        "Lightning Network", 
        "Arbitrum"
      ],
      correctAnswers: [0, 1],
      explanation: "Bitcoin and Ethereum are Layer 1 blockchains (base networks). Lightning Network and Arbitrum are Layer 2 scaling solutions built on top of Layer 1 blockchains."
    },
    {
      id: 5,
      question: "What advantage does Solana offer compared to other blockchains?",
      options: [
        "Oldest blockchain", 
        "Highest market cap", 
        "High transaction speed", 
        "Most decentralized"
      ],
      correctAnswers: [2],
      explanation: "Solana is known for its high transaction speed and throughput, capable of processing thousands of transactions per second with low fees."
    }
  ];

  const handleOptionToggle = (optionIndex: number) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionIndex)) {
        return prev.filter(item => item !== optionIndex);
      } else {
        return [...prev, optionIndex];
      }
    });
  };

  const checkAnswer = () => {
    const currentQ = questions[currentQuestion];
    
    // Check if arrays have the same elements (regardless of order)
    const isCorrect = 
      selectedOptions.length === currentQ.correctAnswers.length && 
      selectedOptions.every(option => currentQ.correctAnswers.includes(option));
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct! +1 XP",
        description: "Great job! You've earned blockchain knowledge points.",
        className: "bg-green-500 text-white font-pixel",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Review the explanation to learn more.",
        variant: "destructive",
        className: "font-pixel",
      });
    }
    
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setSelectedOptions([]);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOptions([]);
    setScore(0);
    setShowResults(false);
    setQuizCompleted(false);
    setShowExplanation(false);
  };

  const currentQ = questions[currentQuestion];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-12 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10"
      >
        {!showResults ? (
          <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur pixel-corners pixel-img-rendering shadow-pixel">
            <CardHeader>
              <CardTitle className="font-pixel text-lg flex items-center">
                <div className="bg-pixel-purple text-white px-3 py-1 mr-2 pixel-corners">
                  Q{currentQuestion + 1}
                </div>
                <span className="flex-1">{currentQ.question}</span>
              </CardTitle>
              <CardDescription className="font-mono text-xs">
                Select all correct answers. {currentQ.correctAnswers.length > 1 ? "(Multiple answers possible)" : "(One answer only)"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentQ.options.map((option, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox 
                      id={`option-${index}`} 
                      checked={selectedOptions.includes(index)}
                      onCheckedChange={() => handleOptionToggle(index)}
                      className="pixel-corners data-[state=checked]:bg-pixel-green"
                    />
                    <label
                      htmlFor={`option-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option}
                    </label>
                  </motion.div>
                ))}
                
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 p-3 bg-secondary/60 border border-border pixel-corners"
                  >
                    <h4 className="font-pixel text-xs mb-2">Explanation:</h4>
                    <p className="text-sm">{currentQ.explanation}</p>
                  </motion.div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border pt-4">
              <div className="text-sm font-pixel">
                {currentQuestion + 1} / {questions.length}
              </div>
              <div className="space-x-2">
                {!showExplanation ? (
                  <Button 
                    onClick={checkAnswer} 
                    disabled={selectedOptions.length === 0}
                    className="pixel-btn"
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button 
                    onClick={nextQuestion} 
                    className="pixel-btn bg-pixel-blue"
                  >
                    {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur pixel-corners pixel-img-rendering shadow-pixel">
            <CardHeader>
              <CardTitle className="font-pixel text-xl">Quiz Results</CardTitle>
              <CardDescription>
                You completed the Blockchain Knowledge Quiz!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="font-pixel text-4xl text-pixel-purple my-4">{score} / {questions.length}</div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="relative inline-block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pixel-purple to-pixel-blue opacity-20 blur-lg rounded-full"></div>
                <PixelIcon className="w-24 h-24 mx-auto" color={`${score >= questions.length / 2 ? "bg-pixel-green" : "bg-pixel-red"}`} />
              </motion.div>
              
              <div className="mt-6 p-4 bg-secondary/40 pixel-corners">
                <h3 className="font-pixel text-sm mb-2">Achievement Unlocked:</h3>
                <p className="text-lg font-semibold">
                  {score === questions.length && "Blockchain Master!"}
                  {score >= questions.length / 2 && score < questions.length && "Blockchain Apprentice"}
                  {score < questions.length / 2 && "Blockchain Explorer"}
                </p>
                <p className="text-xs mt-2 text-muted-foreground">
                  {score === questions.length && "You have mastered blockchain concepts!"}
                  {score >= questions.length / 2 && score < questions.length && "You're on your way to becoming a blockchain expert!"}
                  {score < questions.length / 2 && "Keep learning about blockchain technology!"}
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button onClick={restartQuiz} className="pixel-btn">
                Try Again
              </Button>
            </CardFooter>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
