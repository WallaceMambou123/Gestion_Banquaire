# 🏦 Gestion Bancaire — NestJS
> Conversion de ton projet Java Spring Boot vers NestJS (Node.js)

---

## 📚 C'est quoi NestJS ?

NestJS est un framework pour créer des APIs en **TypeScript** (JavaScript amélioré).
Il s'inspire directement de Java Spring Boot : même structure, mêmes concepts, syntaxe différente.

| Java Spring Boot       | NestJS                   |
|------------------------|--------------------------|
| `@SpringBootApplication` | `AppModule`             |
| `@Entity`              | `@Entity()` (TypeORM)    |
| `@Repository`          | `Repository<T>` (TypeORM)|
| `@Service`             | `@Injectable()`          |
| `@RestController`      | `@Controller()`          |
| `@RequestMapping`      | `@Controller('route')`   |
| `@GetMapping`          | `@Get()`                 |
| `@PostMapping`         | `@Post()`                |
| `@RequestBody`         | `@Body()`                |
| `@PathVariable`        | `@Param()`               |
| `@Valid`               | `ValidationPipe` (global)|
| `@NotNull`, `@NotBlank`| `@IsNotEmpty()`, `@IsString()` |
| `EntityNotFoundException` | `NotFoundException`   |
| `@Transactional`       | `QueryRunner` (DataSource)|

---

## 🗂️ Structure du projet

```
src/
├── main.ts                          ← Point d'entrée (comme BanqueApplication.java)
├── app.module.ts                    ← Module racine (comme @SpringBootApplication)
│
├── client/                          ← Tout ce qui concerne les clients
│   ├── dto/
│   │   └── create-client.dto.ts    ← Formulaire de création client
│   ├── entities/
│   │   └── client.entity.ts        ← Table MySQL "clients"
│   ├── client.controller.ts        ← Routes HTTP /api/clients
│   ├── client.service.ts           ← Logique métier clients
│   └── client.module.ts            ← Module qui regroupe tout
│
├── compte/                          ← Tout ce qui concerne les comptes
│   ├── dto/
│   │   └── create-compte.dto.ts    ← Formulaire d'ouverture de compte
│   ├── entities/
│   │   └── compte.entity.ts        ← Table MySQL "comptes"
│   ├── compte.controller.ts        ← Routes HTTP /api/comptes
│   ├── compte.service.ts           ← Logique métier comptes
│   └── compte.module.ts
│
└── transaction/                     ← Tout ce qui concerne les opérations
    ├── dto/
    │   └── transaction.dto.ts      ← Formulaires dépôt/retrait/virement
    ├── entities/
    │   └── transaction.entity.ts   ← Table MySQL "transactions"
    ├── transaction.controller.ts   ← Routes HTTP /api/operations
    ├── transaction.service.ts      ← Logique métier transactions
    └── transaction.module.ts
```

---

## 🚀 Installation et lancement

### Prérequis
- **Node.js** version 18 ou supérieure → https://nodejs.org
- **MySQL** déjà installé et en cours d'exécution
- Ta base de données `Banque` doit exister

### Étape 1 — Vérifier que Node.js est installé
```bash
node --version   # Doit afficher v18.x ou supérieur
npm --version    # Doit afficher 9.x ou supérieur
```

### Étape 2 — Installer les dépendances
```bash
npm install
```
> Cela installe tous les packages listés dans `package.json`
> (comme `mvn install` en Java)

### Étape 3 — Configurer la base de données
Ouvre le fichier `src/app.module.ts` et modifie si besoin :
```typescript
username: 'mambou',      // Ton nom d'utilisateur MySQL
password: 'Mambou2025!', // Ton mot de passe MySQL
database: 'Banque',      // Nom de ta base de données
```

### Étape 4 — Lancer l'application
```bash
npm run start:dev
```
> L'application se relance automatiquement à chaque modification (comme Spring DevTools)

Tu devrais voir :
```
✅ Serveur bancaire démarré sur http://localhost:3000
```

---

## 🧪 Tester l'API avec Postman

### 1. Créer un client
```
POST http://localhost:3000/api/clients
Content-Type: application/json

{
  "name": "Mambou",
  "prenom": "Jean",
  "email": "jean@gmail.com",
  "telephone": "0612345678"
}
```

### 2. Lister tous les clients
```
GET http://localhost:3000/api/clients
```

### 3. Trouver un client par ID
```
GET http://localhost:3000/api/clients/1
```

### 4. Supprimer un client
```
DELETE http://localhost:3000/api/clients/1
```

### 5. Ouvrir un compte bancaire
```
POST http://localhost:3000/api/comptes
Content-Type: application/json

{
  "clientId": 1,
  "typeCompte": "COURANT",
  "soldeInitial": 1000
}
```

### 6. Voir les comptes d'un client
```
GET http://localhost:3000/api/comptes/client/1
```

### 7. Consulter le solde d'un compte
```
GET http://localhost:3000/api/comptes/1/solde
```

### 8. Faire un dépôt
```
POST http://localhost:3000/api/operations/depot
Content-Type: application/json

{
  "compteId": 1,
  "montant": 500,
  "libelle": "Salaire du mois"
}
```

### 9. Faire un retrait
```
POST http://localhost:3000/api/operations/retrait
Content-Type: application/json

{
  "compteId": 1,
  "montant": 100,
  "libelle": "Courses"
}
```

### 10. Faire un virement
```
POST http://localhost:3000/api/operations/virement
Content-Type: application/json

{
  "source": 1,
  "destination": 2,
  "montant": 200,
  "libelle": "Remboursement"
}
```

### 11. Voir l'historique d'un compte
```
GET http://localhost:3000/api/operations/releve/1
```

---

## ❓ Questions fréquentes

**Q : C'est quoi un DTO exactement ?**
> DTO = Data Transfer Object = "Objet de Transfert de Données"
> C'est le formulaire que l'utilisateur remplit quand il envoie une requête.
> Sans DTO, l'utilisateur pourrait envoyer n'importe quoi.
> Avec le DTO, NestJS vérifie automatiquement que les données sont correctes.

**Q : Pourquoi on a Service ET Controller ?**
> Le Controller gère uniquement HTTP (recevoir/répondre).
> Le Service gère uniquement la logique métier (créer, chercher, calculer).
> Cette séparation rend le code plus propre et testable.

**Q : C'est quoi `synchronize: true` dans app.module.ts ?**
> Cela dit à TypeORM de créer/modifier automatiquement les tables MySQL
> en fonction de tes entités. Pratique en développement.
> ⚠️ Mets `false` si tu passes en production !
