# Step 1
FROM node:10-alpine as build-step
RUN mkdir /bettingproject
WORKDIR /bettingproject
COPY package.json /bettingproject
RUN npm install
COPY . /bettingproject
RUN npm run build
# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /bettingproject/build /usr/share/nginx/html
