import styled from '@emotion/styled';
import { Port } from '@common/interfaces/Types';

const PortContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: calc(10vw / 19.2);
`;

const Stock = styled.div`
	width: calc(12vw / 19.2);
	height: calc(12vw / 19.2);
	border-radius: calc(100vw / 19.2);
	border: calc(2vw / 19.2) solid white;
`;

interface PortProps {
	port: Port;
	colored?: boolean;
}

// TODO: Just no fill if Port is none

const Ports = ({ port, colored }: PortProps) => {
	return (
		<PortContainer>
			<Stock
				style={{
					backgroundColor:
						port === 'Red'
							? !colored
								? 'white'
								: '#FF2020'
							: 'rgba(0, 0, 0, 0)',
				}}
			/>
			<Stock
				style={{
					backgroundColor:
						port === 'Blue'
							? !colored
								? 'white'
								: '#214DFF'
							: 'rgba(0, 0, 0, 0)',
				}}
			/>
			<Stock
				style={{
					backgroundColor:
						port === 'Yellow'
							? !colored
								? 'white'
								: '#FEBB0E'
							: 'rgba(0, 0, 0, 0)',
				}}
			/>
			<Stock
				style={{
					backgroundColor:
						port === 'Green'
							? !colored
								? 'white'
								: '#099200'
							: 'rgba(0, 0, 0, 0)',
				}}
			/>
		</PortContainer>
	);
};

Ports.defaultProps = {
	colored: true,
};

export default Ports;
