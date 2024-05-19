import React, { useState, useEffect } from 'react';
import Section from '../../lib/section';
import { motion } from 'framer-motion';

interface Props {
    currentSectionId: number;
}

const SectionInfo = ({ currentSectionId }: Props) => {
    const [currentSection, setCurrentSection] = useState<Section>();

    useEffect(() => {
        const fetchTask = async () => {
            const section = await Section.createInstance(currentSectionId);
            setCurrentSection(section);
        };

        fetchTask();
    }, [currentSectionId]);

    if (!currentSection) {
        return <div>Loading...</div>;
    }

    return (
        <motion.div
            key={currentSectionId}
            className='m-8 text-center'
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1, ease: 'easeIn' }}
        >
            <h1 className='text-white text-3xl font-bold animate-pulse2'>
                {currentSection?.getName()}
            </h1>
            <p className='text-white mt-7 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-xl text-white font-bold'>
                {currentSection?.getHint()}
            </p>
        </motion.div>
    );
};

export default SectionInfo;
