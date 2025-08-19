model Client {
  id        String   @id @default(uuid())
  name      String
  email     String?
  phone     String?
  stage     DealStage

  // NEW
  address   String?
  birthday  DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  projects  Project[]
  notes     Note[]
}
