import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import MyFlipCard from './MyFlipCard'

export default function MemoryCard() {

    const [cards, setCards] = useState({})
    const [turns, setTurns] = useState(0)
    const [score, setScore] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [oneChoice, setOneChoise] = useState(null)
    const [twoChoice, setTwoChoise] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [gameOver, setGameOver] = useState(false)

    const memoryCards = [
        { "num": 0, "img": "https://i.pinimg.com/564x/18/7a/88/187a88cd5839db1862198ec1cbc2fce4.jpg", "isMatch": false },
        { "num": 1, "img": "https://i.pinimg.com/564x/c3/1d/8d/c31d8de5248b8d835dc3cb2a439500b5.jpg", "isMatch": false },
        { "num": 2, "img": "https://i.pinimg.com/564x/39/f2/91/39f2916eb18f8a7b67ca50b893db27cd.jpg", "isMatch": false },
        { "num": 3, "img": "https://i.pinimg.com/564x/3b/1f/a4/3b1fa424908ffbd8eca8341962d7857b.jpg", "isMatch": false },
        { "num": 4, "img": "https://i.pinimg.com/564x/06/2e/d3/062ed359fca4cae1d657a1edc1a96b25.jpg", "isMatch": false },
        { "num": 5, "img": "https://i.pinimg.com/564x/92/2e/7a/922e7abad66613748a0c2a67fa372e32.jpg", "isMatch": false },

    ]

    const shuffleCards = (cards) => {
        setIsLoading(true)
        let shuffledArray = [...cards, ...cards].map((card, index) => ({ ...card, index }))
        shuffledArray.sort(() => Math.random() - 0.5) // shuffle
        setCards(shuffledArray)
        setIsLoading(false)

    }




    const restart = () => {
    
        setScore(0)
        setTurns(0)
        setGameOver(false)
        shuffleCards(memoryCards)
    }


    useEffect(() => {
        shuffleCards(memoryCards)
    }, [])


    const handleChoise = (card) => {
        oneChoice ? setTwoChoise(card) : setOneChoise(card)

    }


    useEffect(() => {
        if (score === memoryCards.length) {
            setGameOver(true)
        }
    }, [score])


    useEffect(() => {

        if (oneChoice && twoChoice) {
            setDisabled(true)
            if (oneChoice.num == twoChoice.num) {
                setScore(score + 1)
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.index === oneChoice.index || card.index === twoChoice.index) {

                            return { ...card, "isMatch": true }
                        }
                        else {
                            return card
                        }
                    })
                })

                resetTurn()
            }
            else {
                setTimeout(() => {
                    resetTurn()
                }, 500)

            }
        }
    }, [oneChoice, twoChoice])

   


    const resetTurn = () => {
        setTurns(turns + 1)
        setOneChoise(null)
        setTwoChoise(null)
        setDisabled(false)
    }

    return (
        <>
            {gameOver && 
                <View style={styles.gameOverContainer}>
                    <View style={styles.gameOver}>
                        <Text style={styles.gameOverText}>Ты выйграл</Text>
                        <Text style={styles.turns}>Количество ходов : {turns}</Text>
                        <Button title='Рестарт' style={styles.gameOverBtn} onPress={restart}></Button>
                    </View>
                </View>}
            <View style={styles.container}>
                
                <View style={styles.cardsContainer}>
                    {!isLoading ? cards.map((card) =>
                        <MyFlipCard
                            key={card.id}
                            handleChoise={handleChoise}
                            card={card}
                            flipped={card === oneChoice || card === twoChoice || card.isMatch}
                            disabled={disabled}

                        >
                        </MyFlipCard>) : <Text>Загрузка...</Text>}
                </View>
                <View>

                </View>
            </View>
        </>
    )
}




const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',


    },

    cardsContainer: {
        gap: 5,
        position: 'relative',
        top: '25%',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },


    gameOverContainer : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        width : '100%',
        height : '100%',
        backgroundColor : 'rgba(0,0,0,0.9)',
        zIndex : 10,
        position : 'absolute',
        top : 0,
        opacity : 1,



    },


    gameOverText : {
        fontFamily : 'CalibriBold',
        marginBottom : 10,
        textAlign : 'center',
        fontSize : 20
    },


    gameOverBtn : {
        textAlign : 'center',
        alignItems : 'center',
        
        
    },


    gameOver: {
        padding : 25,
        width : '100%',
        backgroundColor : '#fff',
        alignItems : 'center',
        textAlign : 'center'
    },


    turns : {
        fontFamily : 'CalibriBold',
        marginBottom : 8

    }
})









