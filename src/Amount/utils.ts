import {} from '@nestjs/common';

// Function to calculate notes needed based on availablility
export function calculateNotesNeeded(
    amount: number,
    atmCash: Record<string, number>,
): Record<string, number> {
    const notesNeeded: Record<string, number> = {};
    const remainingAmount = { amount };

    const denominations = Object.keys(atmCash)
        .map(Number)
        .sort((a, b) => b - a);

    for (const denomination of denominations) {
        const availableNotes = atmCash[denomination];

        const notesCount = Math.min(
            Math.floor(remainingAmount.amount / denomination),
            availableNotes,
        );

        notesNeeded[denomination.toString()] = notesCount;
        remainingAmount.amount -= notesCount * denomination;
    }
    if (remainingAmount.amount > 0) {
        throw new Error('Insufficient cash in ATM.');
    }

    return notesNeeded;
}

export function parseCashValues(
    cash: Record<string, string>,
): Record<string, number> {
    const parsedCash: Record<string, number> = {};
    for (const denomination in cash) {
        parsedCash[denomination] = parseInt(cash[denomination]);
    }
    return parsedCash;
}
