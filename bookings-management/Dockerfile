FROM openjdk
WORKDIR  usr/src
ENV MONGO_URI=mongodb://localhost:27017/booking
ADD ./target/bookings-management-0.0.1-SNAPSHOT.jar /usr/src/bookings-management-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","bookings-management-0.0.1-SNAPSHOT.jar"]