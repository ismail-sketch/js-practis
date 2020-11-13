/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const promoAdv = document.querySelectorAll('.promo__adv img');
    let promoBg = document.querySelector('.promo__bg ');
    let promoGenre = document.querySelector('.promo__genre');
    const movieList = document.querySelector('.promo__interactive-list');
    const addForm = document.querySelector('form.add');
    const addInput = addForm.querySelector('.adding__input');
    const checkbox = addForm.querySelector('[type="checkbox"]');
    
    
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked; // checked означает, что checkbox отмечен

        if (newFilm) {
           if (newFilm.length > 21) {
               newFilm = `${newFilm.substring(0, 22)}...`; // Обрезание строки фильмом, если она больше 21 символа
           }

           if (favorite) {
                console.log('Добавляем любимый фильм');
           }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
    
            createMovieList(movieDB.movies, movieList);
        }

        addForm.reset(); // Сбросить эту форму. То есть очистить ее
        // Вместо addForm здесь можно использовать event.target 
    });
    
    
    const deleteAdv = (arr)  => {
        arr.forEach(item => {
            item.remove();
        });
    };

    

  // Отсортировать содержимое по алфавиту если там строки (метод для массива sort);

    const makeChanges = () => {
    promoBg.style.cssText = 'background: url(img/bg.jpg) center center/cover no-repeat;';
    promoGenre.textContent = 'драма'; 
    };
    

    const sortArr = (arr) => {
        arr.sort(); // Отсортировать содержимое по алфавиту если там строки (метод для массива sort);
    };
    

    
    
    
    function createMovieList (films, parent) {
        sortArr(films);
        
        parent.innerHTML = '';
    // Перебираем фильмы в movieDB и добавляем их на страницу:
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
            
        });

       document.querySelectorAll('.delete').forEach((btn, i) => {
           btn.addEventListener('click', () => {
               btn.parentElement.remove();
               movieDB.movies.splice(i, 1);

               createMovieList(films, parent);
           });
       });
       
    }
    
    
    makeChanges();
    deleteAdv(promoAdv);
    createMovieList(movieDB.movies, movieList); // Первый аргумент здесь это то, что мы будем перебирать, а второй то, куда будем это помещать
});