import { collections, works } from '../data';

export default function ArchiveSidebar({ selectedId, selectedType, onSelect }) {
    return (
        <aside className="archive-sidebar">
            <section className="sidebar-section sidebar-works">
                <div className="sidebar-heading">
                    <span>Works</span>
                    <span className="sidebar-count">{String(works.length).padStart(2, '0')}</span>
                </div>
                <div className="sidebar-list">
                    {works.map((work, index) => {
                        const isSelected = selectedType === 'work' && selectedId === work.id;
                        return (
                            <button
                                key={work.id}
                                type="button"
                                className={`archive-list-item ${isSelected ? 'is-selected' : ''}`}
                                onClick={() => onSelect(work, 'work')}
                            >
                                <span className="item-index">{String(index + 1).padStart(2, '0')}</span>
                                <span className="item-title">{work.title}</span>
                                <span className="item-year">{work.year}</span>
                            </button>
                        );
                    })}
                </div>
                <button type="button" className="more-button" onClick={() => onSelect(null, 'works')}>
                    ↓ More Works ↑
                </button>
            </section>

            <section className="sidebar-section sidebar-collections">
                <div className="sidebar-heading">
                    <span>Collections</span>
                    <span className="sidebar-count">{String(collections.length).padStart(2, '0')}</span>
                </div>
                <div className="sidebar-list collection-list">
                    {collections.map((collection) => {
                        const isSelected = selectedType === 'collection' && selectedId === collection.id;
                        return (
                            <button
                                key={collection.id}
                                type="button"
                                className={`archive-list-item collection-item ${isSelected ? 'is-selected' : ''}`}
                                onClick={() => onSelect(collection, 'collection')}
                            >
                                <span className="item-index">{collection.number}</span>
                                <span className="item-title">{collection.title}</span>
                            </button>
                        );
                    })}
                </div>
            </section>
        </aside>
    );
}
