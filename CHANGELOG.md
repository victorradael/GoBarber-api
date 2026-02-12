# Changelog

All notable changes to the GoBarber API project will be documented in this file.

## [Unreleased] - 2026-02-12

### Added
- **Containerization:** Added `Dockerfile` (multi-stage build) and `compose.yml` for orchestrating App, Postgres, MongoDB, and Redis.
- **Swagger Documentation:** Integrated `swagger-ui-express` and `swagger-jsdoc`. Docs available at `/api-docs`.
- **Security:** Added `helmet` and `rate-limiter-flexible` for enhanced API security.
- **Scripts:** Added `build` script with `tsc-alias` for path resolution.

### Changed
- **TypeORM:** Migrated from v0.2 to v0.3 using `DataSource` API.
- **AWS SDK:** Migrated from v2 to v3 (modular `@aws-sdk/client-s3` and `@aws-sdk/client-ses`).
- **Path Aliases:** Configured `tsc-alias` to resolve `@modules`, `@config`, `@shared` aliases in production builds.
- **MailProvider:** Refactored to lazy-load providers, improving stability when drivers are not configured.
- **Redis:** Updated `rateLimiter` middleware to use Redis v4 client syntax.

### Fixed
- **Vulnerabilities:** Resolved high/moderate severity issues in `ansi-regex`, `semver`, `lodash`, etc. via `package.json` resolutions.
- **Tests:** Fixed `minimatch` issues and date mocking in Jest tests (`jest.useFakeTimers`).
- **Docker Networking:** Fixed service connection issues by correcting `.env` default hosts.
