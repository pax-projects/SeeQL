'use client';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';
 
function TextFade({
	directionY,
	children,
	className = '',
	staggerChildren = 0.1,
}) {
	// const xOffset = (directionX === 'left' ? -18 : (
	// 	directionX === 'right'
	// 	? 18
	// 	: 0
	// ));

	const yOffset = (directionY === 'down' ? -18 : (
		directionY === 'up'
		? 18
		: 0
	));

	const FADE_DOWN = {
		show: { opacity: 1, y: 0, transition: { type: 'spring' } },
		hidden: { opacity: 0, y: yOffset },
	};
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? 'show' : ''}
			variants={{
				hidden: {},
				show: {
					transition: {
						staggerChildren: staggerChildren,
					},
				},
			}}
			className={className}
		>
			{React.Children.map(children, (child) =>
				React.isValidElement(child) ? (
					<motion.div variants={FADE_DOWN}>{child}</motion.div>
				) : (
					child
				)
			)}
		</motion.div>
	);
}

export { TextFade };