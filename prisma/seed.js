const {PrismaClient} = require('@prisma/client')
const {faker} = require('@faker-js/faker');
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient()

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

async function main() {

    const userNumber = 50
    const tagNumber = 20

    await prisma.user.deleteMany()
    await prisma.artist.deleteMany()
    await prisma.tag.deleteMany()

    await prisma.user.create({
        data: {
            email: 'olsen.matheo@gmail.com',
            password: hashPassword('Matheo51100*'),
            lastname: 'OLSEN',
            firstname: 'Mathéo',
            street: '40 rue roger salengro',
            city: 'Reims',
            postalCode: '51100',
            phone: '0769141995',
            avatarURL: 'https://loremflickr.com/320/240',
            roles: ["ROLE_ADMIN"],
        }
    })

    for (let i = 0; i < tagNumber; i++) {
        await prisma.tag.create({
            data: {
                name: faker.word.adjective()
            }
        })
    }

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

        // 50 % chance of pseudo
        const chance = Math.random() * 100

        const pseudo = chance > 50 ? faker.internet.userName() : null

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
            }
        })
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