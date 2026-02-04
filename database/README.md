# Database Files

This directory contains all SQL files for The Cosmic Weaver database setup.

## Files

- **`schema.sql`** - Complete database schema including tables, indexes, RLS policies, and triggers
- **`seed.sql`** - Initial seed data (categories, tags, sample posts)
- **`fix-rls.sql`** - Fix RLS policies for tables that were missing them (run if you see RLS errors)
- **`fix-warnings.sql`** - Fix function search_path warnings (run if you see security warnings)
- **`fix-performance.sql`** - Optimize RLS policies for better performance (run if you see performance warnings)
- **`fix-indexes.sql`** - Add missing indexes for foreign keys (run if you see unindexed foreign key warnings)

## Setup Instructions

1. Create a Supabase project at https://supabase.com
2. Go to SQL Editor in Supabase Dashboard
3. Run `schema.sql` first to create all tables and policies
4. Run `seed.sql` to populate initial data

## Migration Order

1. Run `schema.sql` (creates all tables, indexes, RLS policies)
2. Run `seed.sql` (inserts default categories, tags, and sample posts)
3. If you see RLS errors in Supabase Security Audit, run `fix-rls.sql`
4. If you see function search_path warnings, run `fix-warnings.sql`
5. If you see performance warnings (auth_rls_initplan, multiple_permissive_policies), run `fix-performance.sql`
6. If you see unindexed foreign key warnings, run `fix-indexes.sql`

## About Info Warnings

- **Unused Index**: These are INFO level warnings that appear because indexes haven't been used yet (no data in tables). They will be used once you start using the application. **Safe to ignore** - keep all indexes.

- **Unindexed Foreign Keys**: These can impact performance. Run `fix-indexes.sql` to add the missing indexes.

## Security Warnings

- **Function Search Path Mutable**: Fixed by adding `SET search_path = public` to functions
- **Extension in Public (pg_trgm)**: This warning is expected and safe. The `pg_trgm` extension must be in the public schema for full-text search to work. This can be safely ignored.

## Notes

- Make sure to run `schema.sql` before `seed.sql`
- The schema includes Row Level Security (RLS) policies
- All tables have proper indexes for performance
- Automatic profile creation on user signup is handled by triggers
