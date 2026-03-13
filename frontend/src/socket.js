import { io } from 'socket.io-client'

export function initSocket() {
	let host = window.location.hostname
	let siteName =
		window.site_name || host || import.meta.env.VITE_SITE_NAME || 'lms'

	// Use env var for socketio_port, fallback to common default (9000)
	let socketioPort = import.meta.env.VITE_SOCKETIO_PORT || 9000
	let port = socketioPort && socketioPort !== 9000 ? `:${socketioPort}` : ''
	let protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'

	let url = `${protocol}://${host}${port}/socket.io/${siteName}`

	let socket = io(url, {
		withCredentials: true,
		reconnectionAttempts: 5,
	})
	return socket
}
