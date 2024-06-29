import { FC, ReactElement } from 'react'
import s from './style.module.css'
import { Button } from 'ui'

type IModalPageProps = {
	active: boolean
	setActive: (value: boolean) => void
	type: 'confirm' | 'modal'
	title?: string
	text?: string
	children?: ReactElement
	okFunction?: () => void
}

const ModalPage: FC<IModalPageProps> = ({
	active,
	setActive,
	type,
	children,
	title,
	text,
	okFunction,
}) => {
	return (
		<div
			onClick={() => setActive(false)}
			className={[s.modalPage, active ? s.active : null].join(' ')}
		>
			<div className={s.modalContent} onClick={e => e.stopPropagation()}>
				<button onClick={() => setActive(false)} className={s.toastCloseButton}>
					<div className={s.toastCloseBtnSpan1}></div>
					<div className={s.toastCloseBtnSpan2}></div>
				</button>
				<h1>{title}</h1>
				{type === 'modal' && <>{children}</>}
				{type === 'confirm' && (
					<>
						<h2>{text}</h2>
						<div className={s.modalContentBtn}>
							<Button
								color='active'
								onClick={() => {
									setActive(false)
									okFunction && okFunction()
								}}
							>
								Ok
							</Button>
							<Button color='red' onClick={() => setActive(false)}>
								Cancel
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default ModalPage
