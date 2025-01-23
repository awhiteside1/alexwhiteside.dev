export function latexEscape(paragraph: string): string {
    // Create a new variable to hold the transformed string
    let escapedParagraph = paragraph;

    // Replace a backslash `\` with `$\backslash$`
    // This involves adding `\backslash` first, then later surrounding it with `$` symbols.
    escapedParagraph = escapedParagraph.replace(/\\/g, "\\backslash");

    // Replace characters that can be escaped in LaTeX
    escapedParagraph = escapedParagraph.replace(/([\$\#&%_{}])/g, "\\$1");

    // Replace `^` characters with `\^{}` so it works correctly in LaTeX
    escapedParagraph = escapedParagraph.replace(/\^/g, "\\^{}");

    // Replace tilde `~` with `\texttt{\~{}}`
    escapedParagraph = escapedParagraph.replace(/~/g, "\\texttt{\\~{}}");

    // Surround all `\backslash` strings with dollar signs to create `$\backslash$`
    escapedParagraph = escapedParagraph.replace(/\\backslash/g, "$\\backslash$");

    // Return the escaped version
    return escapedParagraph;
}
