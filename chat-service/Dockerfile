FROM openjdk
WORKDIR  usr/src
ENV MONGO_URI=mongodb://localhost:27017/chat
ADD ./target/chat-service-0.0.1-SNAPSHOT.jar /usr/src/chat-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","chat-service-0.0.1-SNAPSHOT.jar"]