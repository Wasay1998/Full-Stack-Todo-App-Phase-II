---
name: database-design
description: Design and manage databases including schema design, table creation, and migrations.
---

# Database Design & Migration Skill

## Instructions

1. **Schema Design**
   - Identify core entities (e.g., users, orders, tasks)
   - Define clear relationships:
     - One-to-One
     - One-to-Many
     - Many-to-Many
   - Choose appropriate data types for each field
   - Normalize data to reduce duplication
   - Add indexes for frequently queried columns

2. **Table Creation**
   - Use clear and consistent naming conventions
     - snake_case for table and column names
   - Include primary keys (`id` as UUID or auto-increment)
   - Use foreign keys to enforce relationships
   - Add constraints:
     - NOT NULL
     - UNIQUE
     - DEFAULT values
   - Include timestamps (`created_at`, `updated_at`)

3. **Migrations**
   - Use migration tools (Alembic, Prisma Migrate, Django Migrations, etc.)
   - Version control all schema changes
   - Never modify production schema manually
   - Write reversible migrations (up & down)
   - Test migrations on staging before production

4. **Schema Evolution**
   - Add new columns without breaking existing data
   - Avoid deleting columns directly — deprecate first
   - Backfill data safely when introducing required fields
   - Maintain backward compatibility when possible

5. **Data Integrity & Performance**
   - Enforce foreign key constraints
   - Use transactions for multi-step operations
   - Add indexes to improve read performance
   - Avoid over-indexing (hurts write performance)
   - Use proper data types for storage efficiency

6. **Security Considerations**
   - Restrict database user permissions (least privilege)
   - Prevent SQL injection using parameterized queries / ORM
   - Encrypt sensitive data where required
   - Avoid exposing internal IDs publicly if not necessary

---

## Best Practices

- Design schema before writing application logic
- Keep tables focused (single responsibility)
- Use migrations instead of manual schema edits
- Document relationships and constraints clearly
- Regularly back up the database
- Monitor slow queries and optimize indexes

---

## Example Structure

### Example: Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
