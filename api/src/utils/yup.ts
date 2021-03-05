export const messages = {
    required: (field: string): string => `You should provide ${field}.`,
    min: (field: string): string => `${field} should exceed \${min} characters.`,
    max: (field: string): string => `${field} cannot exceed \${max} characters.`,
    email: (): string => "You should provide valid email.",
    uuid: (field: string): string => `${field} should be uuid.`,
    oneOf: (field: string): string => `${field} should be one of \${values}.`
}
