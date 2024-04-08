const {PrismaClient} = require('@prisma/client')
const {faker} = require('@faker-js/faker');
const bcrypt = require("bcryptjs");
const {addPathSuffix} = require("next/dist/shared/lib/router/utils/add-path-suffix");

const prisma = new PrismaClient()

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

async function main() {

    const userNumber = 50
    const artistNumber = 5

    // delete all
    await prisma.user.deleteMany()

    for (let i = 0; i < userNumber; i++) {

        const firstname = faker.person.firstName()
        const lastname = faker.person.lastName()

        const user = await prisma.user.create({
                data: {
                    email: faker.internet.email({
                        firstName: firstname,
                        lastName: lastname,
                    }),
                    password: hashPassword('Test123456789*'),
                    lastname: lastname,
                    firstname: firstname,
                    street: faker.location.street(),
                    city: faker.location.city(),
                    postalCode: faker.location.zipCode(),
                    phone: '06' + faker.string.numeric(8),
                    avatarURL: faker.image.url(),
                }
            }
        )

        if (i % 2 === 0) {
            const pseudo = i % 2 === 0 ? faker.internet.userName({
                firstName: firstname,
                lastName: lastname,
            }) : undefined
            await prisma.artist.create({
                data: {
                    pseudo,
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    nationality: 'France',
                    facebook: 'https://www.facebook.com/' + firstname + '.' + lastname,
                    instagram: 'https://www.instagram.com/' + firstname + '.' + lastname,
                    linkedin: 'https://www.linkedin.com/in/' + firstname + '-' + lastname,
                    website: 'https://' + firstname + lastname + '.com',
                },
            })
        }
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })