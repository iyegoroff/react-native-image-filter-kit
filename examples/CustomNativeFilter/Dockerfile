FROM iyegoroff/fable-android:1

RUN mkdir /package
COPY . /package
WORKDIR /package/examples/CustomNativeFilter

RUN npm i -g yarn@1.12.3
RUN yarn
RUN npm run generate:android:bundle
RUN rm -rf node_modules/.bin && rm -rf ../../node_modules/.bin
RUN cd android && ./gradlew assembleRelease
