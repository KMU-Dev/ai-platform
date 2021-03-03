export const messages = {
    required: (field: string): string => `You should provide ${field}.`,
    max: (field: string): string => `${field} cannot exceed \${length} characters.`,
    email: (): string => "You should provide valid email.",
}
