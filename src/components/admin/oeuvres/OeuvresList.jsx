export default function OeuvresList({oeuvres}) {
    return (
        <div className={styles.main}>
            {oeuvres.map((oeuvre, index) => (
                <div className={styles.oeuvre} key={index}>
                    <h2>{oeuvre.title}</h2>
                    <p>{oeuvre.description}</p>
                </div>
            ))}
        </div>
    )
}