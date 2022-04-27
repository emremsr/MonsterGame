new Vue({
    el: "#app",
    data: {
        player_heal: 100,
        monster_heal: 100,
        gameIsOn: false,
        attackMultiple: 10,
        specialAttackMultiple: 20,
        healUpMultiple: 20,
        monsterAttackMultiple: 20,
        logs: []
    },
    methods: {
        start_game: function() {
            this.gameIsOn = true;
        },
        attack: function() {
            var point = Math.ceil(Math.random() * this.attackMultiple)
            this.monster_heal = this.monster_heal - point;
            this.addToLog({ turn: "P", text: "Oyuncu Saldırısı (" + point + ")" });
            this.monsterAttack();
        },
        special_attack: function() {
            var point = Math.ceil(Math.random() * this.specialAttackMultiple)
            this.monster_heal -= point;
            this.addToLog({ turn: "P", text: "Özel Saldırı (" + point + ")" });

            this.monsterAttack();
        },
        heal_up: function() {
            var point = Math.ceil(Math.random() * this.healUpMultiple)
            this.player_heal += point;
            this.addToLog({ turn: "P", text: "İlkYardım (" + point + ")" });
            this.monsterAttack();
        },
        give_up: function() {
            this.addToLog({
                turn: "P",
                text: "Oyuncu Pes Etti"
            });
            this.player_heal = 0;
        },
        monsterAttack: function() {
            var point = Math.ceil(Math.random() * this.monsterAttackMultiple)
            this.player_heal -= point;
            this.addToLog({ turn: "M", text: "Canavar Saldırısı (" + point + ")" });

        },
        addToLog: function(log) {
            this.logs.push(log);
        }
    },
    watch: {
        player_heal: function(value) {
            if (value <= 0) {
                this.player_heal = 0;
                if (confirm("Oyunu Kaybettin. Bir daha oynamak ister misin?")) {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = []
                }
            } else if (value >= 100) {
                this.player_heal = 100;
            }
        },
        monster_heal: function(value) {
            if (value <= 0) {
                this.monster_heal = 0;
                if (confirm("Oyunu Kazandın. Bir daha oynamak ister misin?")) {
                    this.player_heal = 100;
                    this.monster_heal = 100
                    this.logs = []
                }
            }
        },
    },
    computed: {
        userProgress: function() {
            return {
                width: this.player_heal + "%"
            }
        },
        monsterProgress: function() {
            return {
                width: this.monster_heal + "%"
            }
        }
    }
})
