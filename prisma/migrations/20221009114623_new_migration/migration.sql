-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "appointmentDate" TEXT NOT NULL,
    "patientCategory" TEXT NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL
);
INSERT INTO "new_Appointment" ("appointmentDate", "category", "description", "doctorId", "id", "patientCategory", "patientId", "status") SELECT "appointmentDate", "category", "description", "doctorId", "id", "patientCategory", "patientId", "status" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
