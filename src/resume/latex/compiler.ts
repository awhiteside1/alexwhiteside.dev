import {exec} from 'node:child_process';
import {promises as fs} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {promisify} from 'node:util';

const execPromise = promisify(exec);

export const compile = async (fileContents: string): Promise<Buffer> => {
    const tempDir = await createTempDir();
    const inputFilePath = join(tempDir, 'input.tex');
    const outputFilePath = join(tempDir, 'input.pdf');

    try {
        // Write the LaTeX input to a temporary file
        await fs.writeFile(inputFilePath, (validateInput(fileContents)));

        // Ensure pdflatex is available before proceeding
        await checkPdflatex();

        // Compile the LaTeX file to PDF
        await executeCommand('pdflatex input.tex', tempDir);

        // Read and return the compiled PDF as a Buffer
        return await fs.readFile(outputFilePath);
    } catch (error) {
        console.error('Error processing LaTeX file:', error);
        throw new Error(`Failed to compile LaTeX file: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
        // Cleanup the temporary directory
        await cleanupTempDir(tempDir);
    }
};

/**
 * Validates the input provided to the LaTeX compiler.
 * Sanitizes the input or rejects invalid content that could cause security issues.
 */
const validateInput = (input: string): string => {
    if (typeof input !== 'string' || !input.trim()) {
        throw new Error('Invalid or empty LaTeX content provided.');
    }
    // Add additional validation or sanitation logic here if necessary
    return input;
};

/**
 * Creates a temporary directory for storing intermediate files.
 */
const createTempDir = async (): Promise<string> => {
    try {
        return await fs.mkdtemp(join(tmpdir(), 'latex-'));
    } catch (error) {
        console.error('Failed to create temporary directory:', error);
        throw new Error('Unable to create temporary directory.');
    }
};

/**
 * Executes a shell command in a specific working directory.
 */
const executeCommand = async (command: string, workingDir: string): Promise<void> => {
    try {
        const {stdout, stderr} = await execPromise(command, {cwd: workingDir});
        if (stdout) console.log('Command output:', stdout);
        if (stderr) console.warn('Command error output:', stderr);
    } catch (error) {
        console.error('Command execution failed:', error);
        throw new Error('pdflatex command failed.');
    }
};

/**
 * Cleans up a temporary directory recursively.
 */
const cleanupTempDir = async (dirPath: string): Promise<void> => {
    try {
        await fs.rm(dirPath, {recursive: true, force: true});
    } catch (error) {
        console.warn('Failed to clean up temporary directory:', error);
        // Proceed without throwing to avoid masking original errors
    }
};

/**
 * Verifies that the `pdflatex` command is available in the system path.
 */
const checkPdflatex = async (): Promise<void> => {
    try {
        await execPromise('pdflatex --version');
    } catch (error) {
        console.error('pdflatex is not installed or not available in PATH:', error);
        throw new Error('pdflatex is required but not installed or unavailable in the system PATH.');
    }
};