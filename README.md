# React-приложение для MySQL библиотеки медиацентра KODI

### О приложении
Данный с базы парсятся в JSON постредством PHP, далее полученный контент сортируется (согласно выбору пользователя), предварительно загружается (для того чтобы показывать карточки одновременно) и отрисовывается React'ом.  
Приложение устанавливается на Windows и Android с кастомным тайтл баром и разными наборами иконок для каждой ОС.  
Имеются темная и светлая темы (динамическая смена в зависимости от настроек браузера/системы).   

### О базе данных
Медиацентр KODI позволяет хранить свою базу данных [централизованно в MySQL](https://kodi.wiki/view/MySQL).  
Данное приложение использует эту базу для представления информации о фильмах и сериалах что хранятся в библиотеке.  

### Иструкция по установке
Если настройка MySQL проводилась согласно инструции на сайте KODI, то никаких изменений в коде приложения не требуется.  
В случае если MySQL ставится только для KODI, я бы порекомендовал XAMPP и установка данного PWA сведется к копированию файлов в htdocs.  
В медиацентре я ипользую скрапер TMDB (стоит по умолчанию) и с ним точно все корректно работает, правда ввиду перебоев с доступом на TMDB, <del>изображения могут подружаться не с первого раза</del> изображения загружаются через прокси Google.  

Демо тут 👉 https://kodi.srrlab.ru/ (моя домашняя библиотека)