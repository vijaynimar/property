import { useState, useEffect, useRef } from "react";

const Agents = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    longitude: "",
    latitude: "",
    category: "",
    phone: "",
    city: "",
    length: 0,
    breadth: 0,
    bhk: 0,
    description: "",
    established: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);

  const pageStyle = {
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    margin: 0,
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: 'Roboto, Arial, sans-serif',
    backgroundColor: '#f8f9fa',
  };

  const formContainerStyle = {
    flex: '0 0 400px',
    marginRight: '20px',
    height: 'calc(100vh - 40px)',
    overflowY: 'auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    padding: '20px',
  };

  const mapContainerStyle = {
    flex: 1,
    height: 'calc(100vh - 40px)',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    overflow: 'hidden',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    fontSize: '14px',
    color: '#5f6368',
    marginBottom: '4px',
    fontWeight: '500',
  };

  const inputStyle = {
    padding: '8px 12px',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#3c4043',
    backgroundColor: '#fff',
    outline: 'none',
  };

  const buttonStyle = {
    backgroundColor: '#1a73e8',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '8px',
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dadce0',
    cursor: 'not-allowed',
  };

  const textareaStyle = {
    ...inputStyle,
    height: '100px',
    resize: 'vertical',
  };

  const coordinatesStyle = {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
  };

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  useEffect(() => {
    if (window.L && !mapRef.current) {
      mapRef.current = true;
      const map = window.L.map("map", { 
        center: [28.61, 77.23], 
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: true,
      });
      
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
      const marker = window.L.marker([28.61, 77.23], { draggable: true }).addTo(map);

      const updateCoordinates = (lat, lng) => {
        setFormData((prev) => ({
          ...prev,
          latitude: lat.toFixed(6),
          longitude: lng.toFixed(6),
        }));
      };

      marker.on("dragend", (event) => {
        const { lat, lng } = event.target.getLatLng();
        updateCoordinates(lat, lng);
      });

      map.on("click", (event) => {
        const { lat, lng } = event.latlng;
        marker.setLatLng([lat, lng]);
        updateCoordinates(lat, lng);
      });

      // Handle window resize
      const handleResize = () => {
        map.invalidateSize();
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    images.forEach((image) => {
      formDataToSend.append("photos", image);
    });

    try {
      const response = await fetch("https://property-gcvo.onrender.com/uploadProperty", {
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
        body: formDataToSend,
      });

      const result = await response.json();
      alert(response.ok ? "Property uploaded successfully!" : result.msg || "Failed to upload property.");
    } catch (error) {
      alert("Network error. Check your connection.");
    }
    setLoading(false);
  };

  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h2 style={{ color: '#202124', marginBottom: '24px', fontSize: '24px' }}>Add New Property</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Title</label>
            <input
              style={inputStyle}
              type="text"
              name="title"
              placeholder="Enter property title"
              value={formData.title}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Price</label>
            <input
              style={inputStyle}
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={coordinatesStyle}>
            <div style={{ ...inputGroupStyle, flex: 1 }}>
              <label style={labelStyle}>Latitude</label>
              <input
                style={inputStyle}
                type="text"
                name="latitude"
                value={formData.latitude}
                placeholder="Latitude"
                readOnly
              />
            </div>
            <div style={{ ...inputGroupStyle, flex: 1 }}>
              <label style={labelStyle}>Longitude</label>
              <input
                style={inputStyle}
                type="text"
                name="longitude"
                value={formData.longitude}
                placeholder="Longitude"
                readOnly
              />
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Category</label>
            <input
              style={inputStyle}
              type="text"
              name="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Phone Number</label>
            <input
              style={inputStyle}
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>City</label>
            <input
              style={inputStyle}
              type="text"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={coordinatesStyle}>
            <div style={{ ...inputGroupStyle, flex: 1 }}>
              <label style={labelStyle}>Length (ft)</label>
              <input
                style={inputStyle}
                type="number"
                name="length"
                placeholder="Enter length"
                value={formData.length}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div style={{ ...inputGroupStyle, flex: 1 }}>
              <label style={labelStyle}>Breadth (ft)</label>
              <input
                style={inputStyle}
                type="number"
                name="breadth"
                placeholder="Enter breadth"
                value={formData.breadth}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>BHK</label>
            <input
              style={inputStyle}
              type="number"
              name="bhk"
              placeholder="Enter BHK"
              value={formData.bhk}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Description</label>
            <textarea
              style={textareaStyle}
              name="description"
              placeholder="Enter property description"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Established Year</label>
            <input
              style={inputStyle}
              type="number"
              name="established"
              placeholder="Enter established year"
              value={formData.established}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Images</label>
            <input
              style={inputStyle}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            style={loading ? disabledButtonStyle : buttonStyle}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Property"}
          </button>
        </form>
      </div>

      <div style={mapContainerStyle} id="map"></div>
    </div>
  );
};

export default Agents;