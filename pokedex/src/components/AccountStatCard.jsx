export default function AccountStatCard({ label, value }) {
    return (
        <div className="stat-card">
            <p>
                {label}
                <br />
                <span>{value}</span>
            </p>
        </div>
    );
}
