import DashboardArtisteCard from "@/components/dashboard/items/artistes/DashboardArtisteCard";

export default function DashboardArtistesTuilesList({artistes}) {

    return (
        artistes.map((artiste, index) => (
            <DashboardArtisteCard
                firstname={artiste.firstname}
                lastname={artiste.lastname}
                pseudo={artiste.pseudo}
                key={index}
            />
        ))
    )

}