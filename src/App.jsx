import { useState } from 'react';
import Header from './components/Header';
import ArchiveSidebar from './components/ArchiveSidebar';
import ProjectViewer from './components/ProjectViewer';

function App() {
    const [selected, setSelected] = useState(null);
    const [selectedType, setSelectedType] = useState('works');

    const handleSelect = (item, type) => {
        setSelected(item);
        setSelectedType(type);
    };

    return (
        <div className="archive-app">
            <Header />
            <div className="archive-layout">
                <ArchiveSidebar
                    selectedId={selected?.id}
                    selectedType={selectedType}
                    onSelect={handleSelect}
                />
                <main className="project-panel">
                    <ProjectViewer
                        selected={selected}
                        selectedType={selectedType}
                        onSelect={handleSelect}
                    />
                </main>
            </div>
        </div>
    );
}

export default App;
