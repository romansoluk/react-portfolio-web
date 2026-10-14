import { collections, works } from '../data';

function IndexCard({ work, index, onSelect }) {
    return (
        <button type="button" className="project-index-card" onClick={() => onSelect(work, 'work')}>
            <div className="project-index-image">
                <img src={work.image} alt={work.title} loading={index < 4 ? 'eager' : 'lazy'} />
                <span className="project-index-number">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="project-index-caption">
                <span>{work.title}</span>
                <span className="project-caption-arrow">↗</span>
            </div>
        </button>
    );
}

function WorkDetail({ work, onBack }) {
    return (
        <article className="detail-view">
            <div className="detail-toolbar">
                <button type="button" className="back-button" onClick={onBack}>
                    ← All works
                </button>
                <span>{String(work.id).padStart(2, '0')} / {String(works.length).padStart(2, '0')}</span>
            </div>
            <div className="detail-image-wrap">
                <img src={work.image} alt={work.title} className="detail-image" />
            </div>
            <div className="detail-info">
                <div>
                    <p className="detail-kicker">Selected work / {work.year}</p>
                    <h1>{work.title}</h1>
                </div>
                <div className="detail-tags">
                    {work.tags.map((tag, index) => (
                        <span key={tag}>{String(index + 1).padStart(2, '0')} {tag}</span>
                    ))}
                </div>
            </div>
            <p className="detail-description">
                An ongoing study of form, composition, material, and movement. A selected
                piece from the archive of multidisciplinary design explorations.
            </p>
        </article>
    );
}

function CollectionDetail({ collection, onBack }) {
    return (
        <article className="detail-view collection-detail">
            <div className="detail-toolbar">
                <button type="button" className="back-button" onClick={onBack}>
                    ← All collections
                </button>
                <span>{collection.number} / {String(collections.length).padStart(2, '0')}</span>
            </div>
            <div className="detail-image-wrap collection-image-wrap">
                <img src={collection.image} alt={collection.title} className="detail-image" />
            </div>
            <div className="detail-info">
                <div>
                    <p className="detail-kicker">Collection / {collection.number}</p>
                    <h1>{collection.title}</h1>
                </div>
                <div className="detail-tags">
                    {collection.tags.map((tag, index) => (
                        <span key={tag}>{String(index + 1).padStart(2, '0')} {tag}</span>
                    ))}
                </div>
            </div>
            <p className="detail-description">{collection.description}</p>
        </article>
    );
}

export default function ProjectViewer({ selected, selectedType, onSelect }) {
    if (selectedType === 'work' && selected) {
        return <WorkDetail work={selected} onBack={() => onSelect(null, 'works')} />;
    }

    if (selectedType === 'collection' && selected) {
        return <CollectionDetail collection={selected} onBack={() => onSelect(null, 'collections')} />;
    }

    if (selectedType === 'collections') {
        return (
            <section className="index-view">
                <div className="viewer-heading">
                    <span>Collections</span>
                    <span>{collections.length} series</span>
                </div>
                <div className="collection-index-grid">
                    {collections.map((collection) => (
                        <button
                            type="button"
                            key={collection.id}
                            className="collection-index-card"
                            onClick={() => onSelect(collection, 'collection')}
                        >
                            <img src={collection.image} alt={collection.title} />
                            <span className="collection-card-number">{collection.number}</span>
                            <span className="collection-card-title">{collection.title}</span>
                        </button>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="index-view">
            <div className="viewer-heading">
                <span>Selected works</span>
                <span>{works.length} projects</span>
            </div>
            <div className="project-index-grid">
                {works.map((work, index) => (
                    <IndexCard key={work.id} work={work} index={index} onSelect={onSelect} />
                ))}
            </div>
        </section>
    );
}
