-- CreateTable
CREATE TABLE "CurrentWeather" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "city" TEXT NOT NULL,
    "lat" INTEGER NOT NULL,
    "lon" INTEGER NOT NULL,
    "dt" INTEGER NOT NULL,
    "temp" INTEGER NOT NULL,
    "feels" INTEGER NOT NULL,
    "sunrise" INTEGER NOT NULL,
    "sunset" INTEGER NOT NULL
);
