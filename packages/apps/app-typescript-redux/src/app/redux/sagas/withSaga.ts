// // import React from 'react';
// import PropTypes from 'prop-types';
// import { compose, lifecycle, getContext, withProps, wrapDisplayName, setDisplayName } from 'recompose';

// export default ({ key, saga, mode }) => Component =>
// 	compose(
// 		setDisplayName(wrapDisplayName(Component, 'withSaga')),
// 		getContext({
// 			store: PropTypes.object.isRequired,
// 		}),
// 		withProps(props => ({
// 			injectSaga: getInjectors(props.store),
// 		})),
// 		lifecycle({
// 			componentDidMount() {
// 				const { injectSaga } = this.props;

// 				injectSaga.inject(key, { saga, mode }, this.props);
// 			},

// 			componentWillUnmount() {
// 				const { injectSaga } = this.props;

// 				injectSaga.eject(key);
// 			},
// 		}),
// 	)(Component);

import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { SagaDescriptor, useSagaInjector, InjectableStore } from './sagaInjector';

export function useSaga(reg: SagaDescriptor, props: any) {
	const store = useStore();
	const injectSaga = useSagaInjector(store as InjectableStore);

	useEffect(() => {
		injectSaga.inject(reg.key, reg, props);

		return function cleanup() {
			injectSaga.eject(reg.key);
		};
	});
}
