cd ./backend || exit
python manage.py compilescss
python manage.py migrate
python manage.py collectstatic --noinput -i other
