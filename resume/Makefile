# Directory where the Typst document is located
DOCS_DIR := documents
# Directory where build outputs will be placed
BUILD_DIR := build
# Input file (without .typ extension)
DOCUMENT_NAME := demo
# Output PDF filename
OUTPUT_FILENAME := alex-whiteside-resume.pdf

# Default target
all: build

# Create build directory if it doesn't exist
$(BUILD_DIR):
	@mkdir -p $(BUILD_DIR)

# Build the resume PDF
build: $(BUILD_DIR)
	@echo "Building resume..."
	@typst compile $(DOCS_DIR)/$(DOCUMENT_NAME).typ $(BUILD_DIR)/$(OUTPUT_FILENAME) --root .
	@echo "Resume built at $(BUILD_DIR)/$(OUTPUT_FILENAME)"

# Watch for changes and rebuild automatically
watch:
	@echo "Watching for changes..."
	@typst watch $(DOCS_DIR)/$(DOCUMENT_NAME).typ $(BUILD_DIR)/$(OUTPUT_FILENAME) --root .

# Open the built PDF
open:
	@if [ -f "$(BUILD_DIR)/$(OUTPUT_FILENAME)" ]; then \
		open "$(BUILD_DIR)/$(OUTPUT_FILENAME)"; \
	else \
		echo "No built PDF found. Run 'make build' first."; \
		exit 1; \
	fi

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	@rm -rf $(BUILD_DIR)

# Install Typst (macOS with Homebrew)
install-typst:
	@if ! command -v typst &> /dev/null; then \
		echo "Installing Typst..."; \
		brew install typst; \
	else \
		echo "Typst is already installed."; \
	fi

# Show help
help:
	@echo "\nAvailable targets:"
	@echo "  make build     - Build the resume PDF"
	@echo "  make watch     - Watch for changes and rebuild automatically"
	@echo "  make open      - Open the built PDF"
	@echo "  make clean     - Remove build artifacts"
	@echo "  make install-typst - Install Typst (requires Homebrew)"
	@echo "  make help      - Show this help message"

.PHONY: all build watch open clean install-typst help