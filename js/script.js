$(function () {

    let click = 0;                                          // счетчик перевернутых карт
    let card1, card2;

    function handler() {
        if (!card1) {
            card1 = $(this);
            card1.addClass('flip');
            card1.unbind('click', handler);
            ++click;
        } else if (!card2) {
            card2 = $(this);
            card2.addClass('flip');
            ++click;
            (card1.attr('name') === card2.attr('name')) ? equal() : unequal();
        }
    }

    function equal() {                                      //совпадение карт
        setTimeout(function () {
            card1.css('visibility', 'hidden');
            card2.css('visibility', 'hidden');
            reset();
        }, 900);
        win();
    }

    function unequal() {                                    //несовпадение
        setTimeout(function () {
            card1.removeClass('flip');
            card2.removeClass('flip');
            reset();
        }, 900);
    }

    function reset() {
        card1.bind('click', handler);
        card1 = null;
        card2 = null;
    }

    let couple = 0;                                         //совпадение пары
    function win() {
        couple++;
        if (couple === 16) {                                //если все карты совпали
            setTimeout(function () {
                $('<p>').text(`Победа!!! Кол-во ходов:  ${click}`)
                .css({
                    position: 'absolute',
                    top: "50%",
                    transform: 'translate(0, -50%)',
                    zIndex: '5',
                    fontSize: '32px',
                    color: 'white'
                }).appendTo('#contain');
            }, 1500);

            cards.unbind('click', handler);
        }
    }

for (let i = 1; i < 17; i++) {
    for (let j = 0; j < 2; j++) {
        $('<div>').attr({class: 'card', name: `img ${i}`}).appendTo('#contain');
    }
    $('<img>').attr({class: 'face', src: 'image/img' + i + '.jpg'}).appendTo(`div[name *= ${i} ]`);
    $('<img>').attr({class: 'cover', src: 'image/fon3.jpg'}).appendTo(`div[name *= ${i} ]`);
}

let cards = $('.card');

    let arr = [];

    while (arr.length < 31) {                               //массив случайных, неповторяющихся цифр (0-31)
        let tmp = Math.floor(Math.random() * 31);
        if (arr.indexOf(tmp) === -1) {                      //если tmp нет в массиве
            arr.push(tmp);                                  //добавить
        }
    }

    for (let i = 0; i < 32; i++) {
         cards.eq(i).css({order: arr[i]});                  //назначение случайного ордера
       // cards.eq(i).css({order: i});                     // для быстрой проверки
    }
   cards.bind('click', handler);                          //назначение обработчика



});

