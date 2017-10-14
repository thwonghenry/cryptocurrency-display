# Cryptocurrency Real Time Price Check

A simple view to show most currency price in USD

## Design

![Design](design.png)

## Development Setup

Make sure you have docker installed, then

```bash
cd ${this_project_folder}
cp .env.sample .env
docker-compose up
```

It will take some time to build the react bundle, can start access after `app is up!` is shown in the log.

Then the web is up at `http://localhost:${APP_PORT}`, where `APP_PORT` default is `8181`

The app server has watch mode on frontend source codes, the server will rebuild the bundle automatically when saved. Refresh to get the latest bundle.

