define ->
  Unit = (c)->c
  Card = (c)->c
  sid = 0

  getCards: (done)->
    done (for i in [1..5] then Card name: "Card #{i}", desc: "Desc #{i}", imgUrl: "images/cards/1#{i}.JPG")
  
  getManaState: (done)->
    done
      fire: 100
      water: 80
      ice: 75
      wind: 40
      earth: 20

  getArea: ({x, y},done)->
    done
      land:
        type: 'fire' # mana type
      group:
        type: 'ally' # ally, enemy, or neutral
        units: [
          Unit name: 'Ant', health: 75
          Unit name: 'Snake', health: 50
          Unit name: 'Tiger', health: 30
          Unit name: 'Dragon', health: 100
        ]
