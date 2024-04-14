migration:
	go run migration/migration.go
.PHONY: migration

test:
	go test -v -count=1 -cover ./...
.PHONY: test

## Output coverage of testing
test-with-cov:
	go test -count=1 -coverprofile=cover.out ./...
	go tool cover -html=cover.out
.PHONY: cov
