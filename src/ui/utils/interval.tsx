import { Temporal, type Intl as TemporalIntl } from 'temporal-polyfill'
export const generateInterval = (
    fromDate: Date,
    toDate?: Date,
    options: TemporalIntl.DateTimeFormatOptions = {
        month: 'short',
        year: 'numeric',
    }
) => {
    const from = Temporal.PlainDate.from(fromDate.toISOString().split('T')[0])
    const to = toDate
        ? Temporal.PlainDate.from(toDate.toISOString().split('T')[0])
        : undefined

    const interval = [from, to]
        .map((date) =>
            date ? date.toLocaleString('en-US', options) : 'Present'
        )
        .join(' - ')
    return interval
}

export const byDate =
    <T,>(fn: (input: T) => Date | undefined) =>
    (a: T | undefined, b: T | undefined) => {
        if (!b || !a) return 0

        const [a1, b1] = [a, b].map(fn).map((date) => date?.getTime() ?? 0)

        return b1 - a1
    }


    export const byNumber =
    <T,>(fn: (input: T) => number | undefined, reverse = false) =>
    (a: T | undefined, b: T | undefined) => {
        if (!b || !a) return 0

        const [a1, b1] = [a, b].map(fn).map((num) => num ?? Number.MAX_SAFE_INTEGER)

        return  reverse ? b1-a1 : a1-b1
    }
