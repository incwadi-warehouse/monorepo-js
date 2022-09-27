ARG VUE_APP_BASE_URL

# build stage
FROM node:lts-alpine as build-stage

WORKDIR /usr/app

COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install
COPY . .

ARG VUE_APP_API
ENV VUE_APP_API=$VUE_APP_API

ARG VUE_APP_I18N_LOCALE
ENV VUE_APP_I18N_LOCALE=$VUE_APP_I18N_LOCALE

ARG VUE_APP_LOGO
ENV VUE_APP_LOGO=$VUE_APP_LOGO

ARG VUE_APP_THEME
ENV VUE_APP_THEME=$VUE_APP_THEME

ARG VUE_APP_ABOUT
ENV VUE_APP_ABOUT=$VUE_APP_ABOUT

ARG VUE_APP_BASE_URL
ENV VUE_APP_BASE_URL=$VUE_APP_BASE_URL

ARG VUE_APP_BRANCH
ENV VUE_APP_BRANCH=$VUE_APP_BRANCH

RUN yarn build

# production stage
FROM httpd:2.4 as production-stage

ARG VUE_APP_BASE_URL
ENV VUE_APP_BASE_URL=$VUE_APP_BASE_URL

COPY ./docker/httpd.conf /usr/local/apache2/conf/httpd.conf

COPY --from=build-stage /usr/app/dist /usr/local/apache2/htdocs${VUE_APP_BASE_URL}

EXPOSE 80
