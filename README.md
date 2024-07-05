# BotHub Test task

Для старта приложения - `docker compose -f docker-compose.dev.yml`
При первом запуске, для применения миграции - `docker exec -it app npm run prisma:migrate`

После старта Swagger доступен по роуту `/docs`
