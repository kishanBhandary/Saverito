import PageHeader from "../components/PageHeader"
import { User, MapPin, Settings } from "lucide-react"
import { Phone, CreditCard, LogOut } from "../components/Icons"

const ProfilePage = ({ userProfile }) => {
  return (
    <>
      <PageHeader title="Profile" subtitle="your account" />

      <div className="profile-container">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {userProfile.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>

        <h2 className="profile-name">{userProfile.name}</h2>

        <div className="profile-details">
          <div className="profile-detail-item">
            <User size={18} />
            <p>{userProfile.email}</p>
          </div>
          <div className="profile-detail-item">
            <Phone size={18} />
            <p>{userProfile.phone}</p>
          </div>
          <div className="profile-detail-item">
            <MapPin size={18} />
            <p>{userProfile.address}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="profile-action-button">
            <Settings size={18} />
            Account Settings
          </button>
          <button className="profile-action-button">
            <MapPin size={18} />
            Saved Addresses
          </button>
          <button className="profile-action-button">
            <CreditCard size={18} />
            Payment Methods
          </button>
          <button className="profile-action-button logout">
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </div>
    </>
  )
}

export default ProfilePage

