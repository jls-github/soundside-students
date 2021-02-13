import {join} from 'path'
import fs from 'fs'

export {}

const newslettersDirectory: string = join(process.cwd(), '_newsletters')

// export const getNewsletters: Promise<{slug: string, title: string}[]> {

// }

export const getPostSlugs: string[] {
    return fs.readdirSync(newslettersDirectory)
}