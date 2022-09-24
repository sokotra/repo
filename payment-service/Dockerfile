FROM openjdk
WORKDIR usr/src
ENV MYSQL_USERNAME=root
ENV MYSQL_PASSWORD=Vishnu@1
ADD ./target/payment-service-0.0.1-SNAPSHOT.jar /usr/src/payment-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","payment-service-0.0.1-SNAPSHOT.jar"]