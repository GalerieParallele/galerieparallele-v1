import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {useOeuvres} from "@/hooks/useOeuvres";
import ROUTES from "@/constants/ROUTES";
import {Toast} from "@/constants/ToastConfig";
import styles from "@/pages/dashboard/artistes/edit/[id]/oeuvres/edit/[oeuvreId]/colors/Index.module.scss";
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import Skeleton from "@/components/ui/Skeleton";

import specialStyle from './Index.module.scss';
import Carousel from "@/components/ui/carousel/Carousel";
import Image from "next/image";
import {FaArrowLeft, FaArrowRight, FaTrashAlt} from "react-icons/fa";
import {BiSolidImageAdd} from "react-icons/bi";
import StorageUtils from "@/utils/StorageUtils";
import LittleSpinner from "@/components/ui/LittleSpinner";

export default function HomeOeuvreDashboardEditImages() {

    const router = useRouter();

    const {
        oeuvre,
        getOeuvreById,
        loading,
    } = useOeuvres();

    const [artisteId, setArtisteId] = useState(null);
    const [oeuvreId, setOeuvreId] = useState(null);
    const [localImages, setLocalImages] = useState([]);
    const [userHasModified, setUserHasModified] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    const addImageZone = useRef(null);

    const handleFormatLocalImages = () => {
        localImages.sort((a, b) => a.position - b.position);

        localImages.forEach((image, index) => {
            image.position = index + 1;
        });
    };

    /**
     * Permet de gérer le déplacement des images dans le tableau suivant la direction et la position actuelle sans sortir du tableau
     * @param direction left | right
     * @param position La position actuelle de l'image dans le tableau
     */
    const handleMoveImage = (direction, position) => {

        handleFormatLocalImages();

        const index = localImages.findIndex(img => img.position === position);
        if (index === -1) return;

        const swapWith = direction === 'left' ? index - 1 : index + 1;
        if (swapWith < 0 || swapWith >= localImages.length) return;

        const newImages = [...localImages];
        // Swapping the images in the array
        [newImages[index], newImages[swapWith]] = [newImages[swapWith], newImages[index]];

        // Updating the 'position' property to reflect their new positions in the array
        newImages[index].position = index + 1;  // Update the moved item to its new position
        newImages[swapWith].position = swapWith + 1;  // Update the swapped item to its new position

        setLocalImages(newImages);
        setUserHasModified(true);
    };
    /**
     * Permet de simuler un click sur l'input file pour ajouter une ou plusieurs images
     */
    const handleSimulateClick = () => {
        addImageZone.current.click();
    };

    const handleUploadImages = async (event) => {

        setUpdateLoading(true);

        const files = Array.from(event.target.files);
        event.target.value = '';

        // Create an array of promises from the file list
        const uploadPromises = files.map(file => {
            return StorageUtils.uploadFile(file, `artistes/${artisteId}/oeuvres/${oeuvre.name}/${file.name}`, null)
                .then(data => {
                    return {success: true, url: data.downloadURL};
                })
                .catch(error => {
                    Toast.fire({
                        icon: 'error',
                        title: `Une erreur est survenue lors de l'ajout de l'image: ${file.name}`
                    });
                    return {success: false, url: null};
                });
        });

        // Use Promise.all to wait for all uploads to complete
        const results = await Promise.all(uploadPromises);

        // Filter out unsuccessful uploads and update the local images state
        const successfulUploads = results.filter(result => result.success && result.url);
        if (successfulUploads.length > 0) {
            setLocalImages(prevImages => [
                ...prevImages,
                ...successfulUploads.map((upload, index) => ({
                    url: upload.url,
                    position: prevImages.length + index + 1
                }))
            ]);
            setUserHasModified(true);
        }
        handleFormatLocalImages();
        setUpdateLoading(false);
    };


    const handleSaveImages = async () => {
        setUpdateLoading(true);
        Toast.fire({
            icon: 'info',
            title: "Mise à jour de l'oeuvre en cours..."
        });
        try {
            const response = await fetch(ROUTES.API.OEUVRES.HOME, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: parseInt(oeuvreId),
                    images: localImages
                })
            });

            if (response.ok) {
                Toast.fire({
                    icon: 'success',
                    title: "L'oeuvre a été mise à jour avec succès."
                });
            } else {
                throw new Error('Server responded with an error');
            }
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: "Une erreur est survenue lors de la mise à jour de l'oeuvre."
            });
        } finally {
            setUpdateLoading(false);
        }
    };


    const handleDeleteImage = (url) => {
        setUpdateLoading(true);
        StorageUtils.deleteFile(url)
            .catch(() => {
                Toast.fire({
                    icon: 'error',
                    title: "Une erreur est survenue lors de la suppression de l'image."
                });
            }).then(() => {
            setLocalImages(prevImages => prevImages.filter(image => image.url !== url));
            setUserHasModified(true);
            handleFormatLocalImages();
            Toast.fire({
                icon: 'success',
                title: "L'image a été supprimée avec succès."
            });
        })
            .finally(() => {
                setUpdateLoading(false);
            });
    };


    useEffect(() => {
        if (oeuvre?.images?.length > 0) {
            setLocalImages(oeuvre.images.map((image) => ({
                url: image.url,
                position: image.position
            })));
            setUserHasModified(false);
        }
    }, [oeuvre]);

    useEffect(() => {
        if (userHasModified) {
            handleSaveImages()
                .catch(() => {
                    Toast.fire({
                        icon: 'error',
                        title: "Une erreur est survenue lors de la mise à jour de l'oeuvre."
                    });
                });
        }
    }, [localImages, userHasModified])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 'Escape') router.push(ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.EDIT(artisteId, oeuvreId));
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    });

    useEffect(() => {
        if (router.isReady) {
            setArtisteId(router.query.id);
            setOeuvreId(router.query.oeuvreId);
        }
    }, [router, router.isReady]);

    useEffect(() => {
        if (oeuvreId)
            getOeuvreById(oeuvreId)
                .catch(() => {
                    Toast.fire({
                        icon: 'error',
                        title: "Une erreur est survenue lors de la récupération de l'oeuvre."
                    });
                });
    }, [oeuvreId])

    return (
        <div className={styles.main}>
            <DashboardNavbar
                returnURL={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.EDIT(artisteId, oeuvreId)}
            />
            <div className={styles.content}>
                {
                    loading || !oeuvre ? (
                        <>
                            <div>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '500px',
                                    }}
                                >
                                    <Skeleton/>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={specialStyle.mainContainer}>
                                <div className={specialStyle.carousel}>
                                    <Carousel
                                        // ranger par position
                                        images={localImages.map(image => image.url).sort((a, b) => a.position - b.position)}
                                        autoLoop
                                    />
                                </div>
                                <div
                                    className={specialStyle.addImageZone}
                                    onClick={handleSimulateClick}
                                >
                                    <input
                                        type={"file"}
                                        accept={"image/*"}
                                        multiple={true}
                                        hidden={true}
                                        ref={addImageZone}
                                        onChange={(e) => handleUploadImages(e)}
                                        disabled={updateLoading}
                                    />
                                    <BiSolidImageAdd/>
                                    <h3>Cliquez pour ajouter une image ou plusieurs images</h3>
                                </div>
                                <div className={specialStyle.currentImages}>
                                    {
                                        localImages.length === 0 && (
                                            <div className={specialStyle.noImage}>
                                                <h3>Aucune image n&apos;a été ajoutée pour le moment.</h3>
                                            </div>
                                        )
                                    }
                                    {
                                        localImages && localImages.length > 0 && localImages.map((image, index) => (
                                            <div
                                                key={image.position}
                                                className={specialStyle.imgContainer}>
                                                <Image
                                                    src={image.url}
                                                    alt={`Photo de l'oeuvre ${oeuvre.name} numéro ${image.position}`}
                                                    width={200}
                                                    height={200}
                                                />
                                                { // Flèche gauche : affichée si ce n'est pas la première image
                                                    index !== 0 && (
                                                        <div
                                                            className={specialStyle.leftButton}
                                                            onClick={() => handleMoveImage('left', image.position)}
                                                        >
                                                            <button>
                                                                {updateLoading ? <LittleSpinner/> : <FaArrowLeft/>}
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                                { // Flèche droite : affichée si ce n'est pas la dernière image
                                                    index !== localImages.length - 1 && (
                                                        <div
                                                            className={specialStyle.rightButton}
                                                            onClick={() => handleMoveImage('right', image.position)}
                                                        >
                                                            <button>
                                                                {updateLoading ? <LittleSpinner/> : <FaArrowRight/>}
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                                <div
                                                    onClick={() => handleDeleteImage(image.url)}
                                                    className={specialStyle.deleteButton}>
                                                    <button>
                                                        {updateLoading ? <LittleSpinner/> : <FaTrashAlt/>}
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )

}