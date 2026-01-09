import '../../styles/AdminHouseForms.scss';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const HouseForm = ({ initialData = {}, onSubmit, buttonText }) => {
    // Estado para los textos
    const [formData, setFormData] = useState({
        titulo: initialData.titulo || '',
        ubicacion: initialData.ubicacion || '',
        precioNoche: initialData.precioNoche || '',
        descripcion: initialData.descripcion || '',
        estado: initialData.estado || 'disponible' // Si no viene nada, es disponible
    });

    // Estado para las fotos que ya existen
    const [existingImages, setExistingImages] = useState(initialData.imagenes || []);

    // Estado para los archivos = fotos nuevas 
    const [files, setFiles] = useState([]);

    // Configuración de Dropzone -> sacado de la docu npm react-dropzone
    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: (acceptedFiles) => setFiles([...files, ...acceptedFiles])
    });

    // Función para quitar una foto que YA estaba subida
    const removeExisting = (urlToRemove) => {
        setExistingImages(existingImages.filter(url => url !== urlToRemove));
    };

    const handleChange = (ev) => {
        setFormData({ ...formData, [ev.target.name]: ev.target.value });
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        // Mandamos los textos (incluyendo las URLs antiguas) y los archivos nuevos
        const exito = await onSubmit({ ...formData, imagenesRestantes: existingImages }, files);
       if (exito) {
        console.log("Formulario enviado con éxito");

    }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
                <label>Título de la vivienda</label>
                <input name="titulo" type="text" value={formData.titulo} //Esto hace que aparezca el texto al editar
                    onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Ubicación</label>
                <input name="ubicacion" type="text" value={formData.ubicacion} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Precio por noche (euros) </label>
                <input name="precioNoche" type="number" value={formData.precioNoche} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Descripción</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Estado de la vivienda</label>
                <select name="estado" value={formData.estado} onChange={handleChange}>
                    <option value="disponible">Disponible</option>
                    <option value="reservada">Reservada</option>
                </select>
            </div>

            {/* --- VISTA DE FOTOS ACTUALES --- */}
            <div className="fotos-gestion">
                <label>Fotos actuales:</label>
                <div className="previews-grid">
                    {existingImages.map((url, index) => (
                        <div key={index} className="thumb-container">
                            <img src={url} alt="existente" />
                            {/* Botón para borrar la URL de la lista */}
                            <button 
                                type="button" 
                                className="btn-delete-img"
                                onClick={() => removeExisting(url)}
                            >
                               x 
                            </button>
                        </div>
                    ))}
                </div>

                {/* --- DROPZONE para subir nuevas fotos--- */}
                <label>Añadir fotos nuevas:</label>
                <div {...getRootProps()} className="dropzone-area">
                    <input {...getInputProps()} />
                    <p>Arrastra o haz clic para añadir más fotos</p>
                </div>
                
                {/* Lista de archivos nuevos seleccionados */}
                <ul className="files-list">
                    {files.map((file, i) => (
                        <li key={i}>
                             {file.name}
                            <button type="button" onClick={() => setFiles(files.filter((_, idx) => idx !== i))}>x</button>
                        </li>
                    ))}
                </ul>
            </div>

            <button type="submit" className="btn-submit">
                {buttonText}
            </button>
        </form>
    );
}